show all database
```
show databases
```

set the active database
```
use sample_airbnb
```

to know the current db
```
db
```

to see all collections
```
show collections
```

# Find documents
generic syntax (find() restrict the first 10/20 documents, not all doc)
```
db.<name of the collection>.find()
```

prettify the result
```
db.<name of collection>.find().pretty()
```

# limit to some results
```
db.listingsAndReviews.find().pretty().limit(5)
```

# projection 
choose which field to display, we want want to see name of the listing and number of beds
first argument {}/filter to get all the docs, only interested in names and beds field 
name: 1  -  1 means true, -1 means false
```
db.listingsAndReviews.find({},{
    'name':1,
    'beds':1
} ).pretty().limit(5)
```

# filter by a criteria
Find all listings with 2 beds

```
db.listingsAndReviews.find({
    "beds":2
},{
    "name":1,
    "beds":1
})
```

## search by multiple criteria (AND)
Find all docs with 2 bedsrooms and 2 beds
find({},{}) - first arg is the critiera, and second arg is the projection (what attributes you want to keep)
```
db.listingsAndReviews.find({
    "beds":2,
    "bedrooms":2
},{
    "name":1,
    "beds":1,
    "bedrooms":1,
    "house_rules":1
}).pretty().limit(5)
```

# search by keys of nested objects
find doc where country is Bazil, give me back the results with only country and name

```
db.listingsAndReviews.find({
    'address.country': 'Brazil'
},{
    'address.country':1,
    'name':1,
}).pretty()
```

# Filter by inequality
have to use special operators for inequality , such as greater than or lesser than

Example: Find all doc that more than or equal to 3 bed rooms

```
db.listingsAndReviews.find({
    'bedrooms':{
        '$gte':3
    }
},{
    "name":1,
    "bedrooms":1
}).pretty()
```

Example: search all doc that has between 3 and 6 bedrooms
```
db.listingsAndReviews.find({
    "bedrooms":{
        "$gte":3,
        "$lte":6
    }
},{
    "name":1,
    "bedrooms":1
}).pretty()
```

example: find all doc in the Brazil that has less that 4 bed rooms
```
db.listingsAndReviews.find({
    "address.country":"Brazil",
    "bedrooms":{
        "$lte":4
    }
},{
    "address.country":1,
    "name":1,
    "bedrooms":1
}).pretty()
```

# Find by element in array

e.g. find listings that have "icon" in amenities

```
db.listingsAndReviews.find({
    "amenities": "Oven"
},{
    "name":1,
    "amenities":1
}).pretty()
```

e.g. find all docs that has oven or microwave or stove
$in - find doc with amenities that has at least one elemnt in the array
```
db.listingsAndReviews.find({
    "amenities":{
        "$in":["Oven","Microwave","Stove"]
    }
},{
    "name":1,
    "amenities":1
}).pretty()
```

e.g. all listings that match everything in the array
$all - find docs that has all the elements in the array
```
db.listingsAndReviews.find({
    "amenities":{
        "$all":["Oven","Microwave","Stove"]
    }
},{
    "name":1,
    "amenities":1
}).pretty()
```

# Search by objectId
Find document in the movies that has the follow id
id
:
573a1391f29313caabcd71f5
```
use sample_mflix;
db.movies.find({
    "_id": ObjectId("573a1391f29313caabcd71f5")
}).pretty()
```

# logical operator

Find all docs that has brazil or canada

```
db.listingsAndReviews.find({
    "$or":[
        {
            "address.country": "Brazil"
        },
           {
            "address.country": "Canada"
        }
    ]},{
        "name":1,
        "address.country":1
    }
).pretty();
```

Find all docs that has brazil  must have 3 rooms or canadda

```
db.listingsAndReviews.find({
    "$or":[
        {
            "address.country": "Brazil",
            "bedrooms":{
                "$gte":3
            }
        },
           {
            "address.country": "Canada",
        }
    ]},
    {
        "name":1,
        "address.country":1,
        "bedrooms":1
    }
).pretty();
```

## Fin all listings that has been reviewed by leslie
In other words, we want to shortlist documents by going through an array of an objects

Find reviews array, where each elem match reviewer_name is Leslie
Return the matched element, where review match
```
db.listingsAndReviews.find({
    "reviews":{
        "$elemMatch":{
            "reviewer_name":"Leslie"
        }
    }
},{
    "name":1,
    "reviews.$":1
}).pretty()
```

## Match by date
The adate is in ISO format: YYYY-MM-DD and we need to wrap it with a function
Find all reviews before 2019.
```
db.listingsAndReviews.find({
    "first_review":{
        "$lte": ISODate("2018-12-31")
    }
},{
    "name":1,
    "first_review":1
}).pretty()
```

## Find by string pattern (i.e. regular expressions)
Find all the listings where the name includes the word "spacious"
Option i means case insensitive
```
db.listingsAndReviews.find({
    "name":{
        "$regex": "spacious", "$options":"i"
    }
},{
    "name":1
})
```

## Counting results
count all the number of listings
```
db.listingsAndReviews.find().count()
```

## find all listings that has 6 or more amenities
check if the 6th elements exists (index 5 is the 6th element)
amenities is an array
```
db.listingsAndReviews.find({
    "amenities.5":{
        "$exists":true
    }
},{
    "name":1,
    "amenities":1
}).pretty()
```
