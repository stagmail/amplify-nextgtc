# This is a project created with AWS Amplify Gen 2 amd Next.js 15

## Getting Started - A comprehensive staff transport booking portal for companies. 

- The roles involved are: 

1. controllers (the overall in charge and management of the entire booking system, allocate drivers for all trips, pooling trips of transport bookings to optimized vehicle utilization) 

2. duty managers (supervisor of the company's department) 

3. staff (employees working for the company)

4. drivers (registered drivers with GTC to provide staff transport services)

## Overview of the process and flow:

Duty Managers (from various department) login to the Ground Tranport Concierge booking portal.

From the indent page, make bookings for tranport to work or home, indented lists of the bookings will be display in table on the indent page, upon confirmation of the lists, click on the send bookings button, the lists will be send to lists page and controller's pooling page and the lists on the indent page will be cleared. Managers are only allowed to book transport on the actual day itself. However as the client's operations are 24 hours shift daily we can allow an One day cross over should they are 2 hours before 23:59hr

Controller login to the Ground Tranport Concierge booking portal.

From the pooling page, the controller will see all the bookings from various duty managers, the controller will pool the trips together to optimize vehicle utilization (determine and group by postal codes), allocate drivers to the trips and confirm the bookings. Upon confrimation, the bookings data will be send to the final lists page for monitoring and will be cleared from the pooling page. In the final lists page, the controller are still able to make amendments and edit to the booking time, address, reallocations of the booking to another vehicle/driver.

In the final lists page, there will be status view for all the bookings. Status would be indicated as Pooled or Completed. Like wise the listing page would have the same status view in sync with the final lists page. Listings and final lists page are the main source of truth for monitoring and overview.

The maximum passenger per vehicle is up to 3 pax. 

Drivers login to the Ground Tranport Concierge booking portal.

From the trip(s) page, the driver will see all the trip(s) allocated to him/her, upon completion of the trips, the driver will mark the trip(s) as completed.

Staff login to the Ground Tranport Concierge booking portal.
From the my trips page, the staff will see all the trips booked for him/her.





