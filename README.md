# Flights-API

 
A light-weight RESTful project to demonstrate third-party API integration for fetching real-time airline flights and persisting flight booking information to a NoSQL datastore.

  
## Underlying stack
 - Node
 - TypeScript
 - Express
 - MongoDB
 - [Aviationstack API](https://aviationstack.com/documentation)
 - REST

 
## API Usage

**Create user**
`POST` http://localhost:3030/api/v1/users
Body:

    {
	    "email": "foo@bar.com",
	    "password": "password123",
	    "passwordConfirmation": "password123",
	    "firstName": "Foo",
	    "lastName": "Bar",
	    "age": 32
    }

Login
`POST` http://localhost:3030/api/v1/sessions
Body:

    {
	    "email": "foo@bar.com",
	    "password": "password123"
    }

Response:

    {
	    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmEyMGYyZTU2YjY1ZDRiMDY0YzhlOGMiLCJlbWFpbCI6ImZvbzhAdGVzdC5jb20iLCJmaXJzdE5hbWUiOiJCdWNrIiwibGFzdE5hbWUiOiJHb28iLCJhZ2UiOjQ1LCJjcmVhdGVkQXQiOiIyMDIyLTA2LTA5VDE1OjE4OjA2LjI2NFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA2LTA5VDE1OjE4OjA2LjI2NFoiLCJfX3YiOjAsInNlc3Npb24iOiI2MmEzNzMzMThkNzhlOTBmNzg3ZWZmNDUiLCJpYXQiOjE2NTQ4NzkwMjUsImV4cCI6MTY1NDg5MzQyNX0.KzHfZdZkxn3EngpjVsU7i5jfVL_BCqLdxNySSxko4IM",
	    "refrestToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjJhMjBmMmU1NmI2NWQ0YjA2NGM4ZThjIiwidmFsaWQiOnRydWUsInVzZXJBZ2VudCI6IlBvc3RtYW5SdW50aW1lLzcuMjguNCIsIl9pZCI6IjYyYTM3MzMxOGQ3OGU5MGY3ODdlZmY0NSIsImNyZWF0ZWRBdCI6IjIwMjItMDYtMTBUMTY6Mzc6MDUuODYxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDYtMTBUMTY6Mzc6MDUuODYxWiIsIl9fdiI6MCwiaWF0IjoxNjU0ODc5MDI1LCJleHAiOjE2ODY0MzY2MjV9.KOjIMe6nZuTeZivs8CBuBgNvz0LEBk6TRhlAR8JXeR8"
    }

**Logout**
`DELETE` http://localhost:3030/api/v1/sessions

**Fetch airline info**
`GET` http://localhost:3030/api/v1/airlines
Response:

    [
	    {
	    "airline_name": "American Airlines",
	    "iata_code": "AA",
	    "icao_code": "AAL",
	    "country_name": "United States",
	    "country_iso2": "US"
	    },
	    {
	    "airline_name": "Delta Air Lines",
	    "iata_code": "DL",
	    "icao_code": "DAL",
	    "country_name": "United States",
	    "country_iso2": "US"
	    },
	    ...
    ]

**Flight lookup**
`GET` http://localhost:3030/api/v1/flights?airline_icao=\<code\>&flight_icao=\<code\>
e.g.: http://localhost:3030/api/v1/flights?airline_icao=DAL&flight_icao=DAL420
Response:

    {
	    "departure":  {
	    "flight_date":  "2022-06-10",
	    "airport":  "Los Angeles International",
	    "iata":  "LAX",
	    "icao":  "KLAX",
	    "airline_name":  "Delta Air Lines",
	    "flight_icao":  "DAL420",
	    "airline_icao":  "DAL",
	    "terminal":  "2",
	    "gate":  "26",
	    "scheduled":  "2022-06-10T11:59:00+00:00",
	    "flight_status":  "scheduled"
	    },
	    "arrival":  {
	    "flight_date":  "2022-06-09",
	    "airport":  "Logan International",
	    "iata":  "BOS",
	    "icao":  "KBOS",
	    "flight_icao":  "DAL420",
	    "airline_name":  "Delta Air Lines",
	    "airline_icao":  "DAL",
	    "terminal":  "A",
	    "gate":  "A21",
	    "scheduled":  "2022-06-09T20:35:00+00:00",
	    "flight_status":  "scheduled"
	    }
    }

**Book a flight**
`POST` http://localhost:3030/api/v1/flights
Authenication required
Request *headers*
`Authorization: <Bearer  accessToken>` // accessToken from login response

Body:

    {
	    "flightDate": "2022-09-07",
	    "airlineName": "Delta Air Lines",
	    "airlineIcao": "DAL",
	    "flightIaco": "DAL420",
	    "departureAirportName": "Los Angeles International",
	    "departureAirportIcao": "KLAX",
	    "departureTime": "2022-09-07T11:59:00+00:00",
	    "departureTerminal": "2",
	    "departureGate": "26",
	    "arrivalAirportName": "Logan International",
	    "arrivalAirportIcao": "KBOS",
	    "arrivalTime": "2022-09-07T20:35:00+00:00",
	    "arrivalTerminal": "A",
	    "arrivalGate": "A20"
    }

Response:

    {
	    "_id": "62a373488d78e90f787eff49",
	    "user": "62a20ed9d586a7a95ad3493a",
	    "flightDate": "2022-09-07",
	    "flightIaco": "DAL420",
	    "airlineName": "Delta Air Lines",
	    "airlineIcao": "DAL",
	    "departureAirportName": "Los Angeles International",
	    "departureAirportIcao": "KLAX",
	    "departureTime": "2022-09-07T11:59:00+00:00",
	    "departureTerminal": "2",
	    "departureGate": "26",
	    "arrivalAirportName": "Logan International",
	    "arrivalAirportIcao": "KBOS",
	    "arrivalTime": "2022-09-07T20:35:00+00:00",
	    "arrivalTerminal": "A",
	    "arrivalGate": "A20",
	    "createdAt": "2022-06-10T16:37:28.620Z",
	    "updatedAt": "2022-06-10T16:37:28.620Z",
	    "__v": 0
    }

**Update a flight**
`PUT` http://localhost:3030/api/v1/flights/:flightId
e.g.: http://localhost:3030/api/v1/flights/62a373488d78e90f787eff49
Authenication required
Request *headers*
`Authorization: <Bearer  accessToken>` // accessToken from login response

Body:

    {
	    "flightDate": "2022-11-08",
	    "airlineIcao": "DAL",
	    "flightIaco": "DAL420"
    }

Response:

    {
	    "_id": "62a373488d78e90f787eff49",
	    "user": "62a20ed9d586a7a95ad3493a",
	    "flightDate": "2022-11-08",
	    "flightIaco": "DAL420",
	    "airlineName": "Delta Air Lines",
	    "airlineIcao": "DAL",
	    "departureAirportName": "Los Angeles International",
	    "departureAirportIcao": "KLAX",
	    "departureTime": "2022-09-07T11:59:00+00:00",
	    "departureTerminal": "2",
	    "departureGate": "26",
	    "arrivalAirportName": "Logan International",
	    "arrivalAirportIcao": "KBOS",
	    "arrivalTime": "2022-09-07T20:35:00+00:00",
	    "arrivalTerminal": "A",
	    "arrivalGate": "A20",
	    "createdAt": "2022-06-10T16:37:28.620Z",
	    "updatedAt": "2022-06-10T16:50:11.311Z",
	    "__v": 0
    }

**Delete a flight**
`DELETE` http://localhost:3030/api/v1/flights/:flightId
e.g.: http://localhost:3030/api/v1/flights/62a373488d78e90f787eff49
Authenication required
Request *headers*
`Authorization: <Bearer  accessToken>` // accessToken from login response