import scrapy


class JobspiderSpider(scrapy.Spider):
    name = "jobSpider"
    allowed_domains = ["www.dice.com"]
    start_urls = ["https://www.dice.com/jobs?q=Software&countryCode=US&radius=30&radiusUnit=mi&page=5&pageSize=20&filters.postedDate=ONE&filters.workplaceTypes=Remote&filters.employmentType=CONTRACTS&currencyCode=USD&language=en"]

    def parse(self, response):
        pass
