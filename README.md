# project3

In oil and gas, there is a need to drill. in order to drill on a parcel of land, the company needs the and mineral rights to that land an dpermission to drill. Landmen are contracted by these companies and sometimes title companies to research the proper ownership and and rights to land so they can purchase the mineral rights. Landmen will often have to go to the county to do this research or pay for a service to get the data. some title companies, like the one I work for, purchase the records so they can search through the data and save the title companies money on travel and hotel and county clerk fees...

Counties search for Landmen:
	Current solution has Landmen searching county data on spreadsheets shared by local stores on a server or on HDDs passed around the office. Some data is in Excel and some in Access Databases. Data includes the index data with basic grantor and grantee information as well as the type of data and a brief, not even a full sentence, description of the document. A pdf or tiff of the document is also available though the images aren't always linked to the index.

	Problem: Information is only available on local network or is loaded on the landman's desktop or laptop and takes an exhorbitant 
	amount of space; A single county is 100GB or more of record data and images. 

	Solution: Create a website which can be accessed anywhere by a contractor or landman and allow for them to search county records that the contracting company has purchased.

	Requirements: 
		Authentication: account will be made by site admin for the landman. landman will log in with their credentials. User information will be stored in a SQL DB.
		SQL database: Mongo is not required since the database will be flat. Most of the data is in spreadsheets already. EAch county will be stored in a separate table.
		Document viewing/downloading: the scan of the county record will be downloadable by the user in pdf format.
		Runsheet: allow for landman to add search information to a runsheet. a runsheet stores the information pertaining to one parcel of land which the landman is searching for information in. Runsheet will be CSV and downloadable.
		Store: user can save a runsheet to go back to at a later time.

        Technologies used: project will be deployed to heroku and github. I will load a small subset of two counties information to stay within the restrictions of free heroku and git storage limits. Node, Express, and SQL will be the backbone of the server. Passport will be used for autnentication. React wil be used fo rthe front end rendering of the site and bootstrap with another (undecided) css library will be used. nodemailer will be used to contact the admin of the site. Node filesystem or another csv library will be used to generate the csv.