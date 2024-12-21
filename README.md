# ignis_assignment

I utilized Scrapy along with Playwright to scrape the website https://www.dice.com/jobs, which was dynamically loading its content. This combination allowed me to handle the JavaScript rendering on the page, ensuring that all relevant job data was accurately extracted.

The collected data was then sent to the Django REST Framework backend for storage.

![image](https://github.com/user-attachments/assets/c64fb4d8-781a-40da-96e2-e21415d5c924)

I integrated Django REST Framework with MySQL to efficiently store the received job data in the MySQL database. This setup ensures that the collected job information is securely saved and can be easily queried for further processing or display.

.backend/backend/settings.py

![image](https://github.com/user-attachments/assets/ca334db4-56d1-434e-bc8d-efc5f5ca6733)

I used Django CORS headers to enable cross-origin requests, allowing the frontend to access the API endpoints securely. This configuration ensures seamless communication between the frontend and backend, regardless of their respective domains.

# Frontend Development

Unfortunately, due to the tight submission deadline, I was unable to dedicate as much time to the frontend development as I had hoped. I wish I could have showcased more of my frontend skills and provided a more polished user interface. However, I am confident in my ability to enhance and refine the frontend further given additional time.

I used React.js to fetch the data from the API and display it on the frontend. This enables a dynamic and interactive user interface that effectively presents the job listings retrieved from the backend.


# The Listings Page

![localhost_5173_](https://github.com/user-attachments/assets/64d4a4a5-bf5a-4426-93ce-4eb4d0400036)


# The Job Detail Page

![localhost_5173_jobs_2](https://github.com/user-attachments/assets/3d789af0-7268-4a9d-b61e-868d74c254d8)


