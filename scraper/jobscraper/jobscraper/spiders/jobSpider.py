import scrapy
from scrapy_playwright.page import PageMethod

from jobscraper.items import JobItem
from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.linkextractors import LinkExtractor

import requests

class JobspiderSpider(scrapy.Spider):
    name = "jobSpider"
    allowed_domains = ['dice.com']
    start_urls = ["https://www.dice.com/jobs?page=1&pageSize=20"]

    rules = (
        Rule(LinkExtractor(allow=r'/jobs\?page=\d+&pageSize=\d+'), callback='parse', follow=True),
        Rule(LinkExtractor(allow=r'/job-detail/'), callback='parse_job', follow=False),  # Only follow job-detail pages
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.job_data = []
    
    def start_requests(self):
        yield scrapy.Request(
            self.start_urls[0],
            meta=dict(
                playwright=True,
                playwright_include_page=True,
                playwright_page_methods=[PageMethod("wait_for_selector", "dhi-search-cards-widget")],
            ),
            errback=self.errback,
        )
    

    def closed(self, reason):
        self.send_to_backend(self.job_data)
    

    def send_to_backend(self, job_data):
        url = "http://127.0.0.1:8000/api/job-create/"
        jobs = []
        for job in job_data:
            job_payload = {
                'job_title': job['job_title'],
                'company_name': job['company_name'],
                'posted_time': job['posted_time'],
                'location': job['location'],
                'pay': job['pay'],
                'employment_details': job['employment_details'],
                'skills': job['skills'],
                'job_description': job['job_description'],
                'required_skills': job['required_skills'],
                'preferred_skills': job['preferred_skills'],
                'job_link': job['job_link'],
            }
            jobs.append(job_payload)

        response = requests.post(url, json=jobs)
        if response.status_code == 201:
            self.logger.info(f"Successfully posted {len(jobs)} job records.")
        else:
            self.logger.error(f"Failed to post job data. Status code: {response.status_code}")

    async def parse(self, response):
        page = response.meta["playwright_page"]
        await page.close()
        product_container = response.css("dhi-search-cards-widget .ng-star-inserted")
        products = product_container.css("dhi-search-card")
        for product in products:
            job_id = product.css('a[data-cy="card-title-link"]::attr(id)').get()
            if job_id:
                self.logger.debug(f"Extracted job link: {job_id}")
                full_url = f"https://www.dice.com/job-detail/{job_id}"
                self.logger.debug(f"full url job link: {full_url}")
                headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive',
                }
                yield scrapy.Request(
                    full_url,
                    headers=headers,
                    callback=self.parse_job,
                    meta=dict(
                        playwright=True,
                        playwright_include_page=True,
                    ),
                )

    async def parse_job(self, response):
        page = response.meta["playwright_page"]
        await page.close()
        job_item = JobItem()
        job_item['job_title'] = response.css('h1[data-cy="jobTitle"]::text').get(default='N/A')
        job_item['company_name'] = response.css('a[data-cy="companyNameLink"]::text').get(default='N/A')
        job_item['posted_time'] = response.css('span#timeAgo::text').get(default='N/A')
        job_item['location'] = response.css('span[id^="location"]::text').get(default='N/A')
        job_item['pay'] = response.css('span[id^="payChip"]::text').get(default='N/A')
        job_item['employment_details'] = response.css('div[data-cy="employmentDetails"] .chip_chip__cYJs6 span::text').getall()
        job_item['skills'] = response.css('div[data-cy="skillsList"] .chip_chip__cYJs6 span::text').getall()
        job_item['job_description'] = ''.join(response.css('div[data-testid="jobDescriptionHtml"] *::text').getall()).strip()
        job_item['required_skills'] = response.css('div[data-testid="jobDescriptionHtml"] ul:first-of-type li::text').getall()
        job_item['preferred_skills'] = response.css('div[data-testid="jobDescriptionHtml"] ul:last-of-type li::text').getall()
        job_item['job_link'] = response.url

        self.job_data.append(job_item)

    async def errback(self, failure):
        page = failure.request.meta.get("playwright_page")
        if page:
            await page.close()
        self.logger.error(f"Request failed: {failure}")
