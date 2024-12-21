# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class JobscraperItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class JobItem(scrapy.Item):
    job_title = scrapy.Field()
    company_name = scrapy.Field()
    posted_time = scrapy.Field()
    location = scrapy.Field()
    pay = scrapy.Field()
    employment_details = scrapy.Field()
    skills = scrapy.Field() 
    job_description = scrapy.Field() 
    required_skills = scrapy.Field()  
    preferred_skills = scrapy.Field() 
    job_link = scrapy.Field()  