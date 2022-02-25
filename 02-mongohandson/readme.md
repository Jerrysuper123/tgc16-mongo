# 1
```
use sample_training
```

# 2.a
```
db.companies.find({
    "founded_year": 2006
},{
    'name':1,
    "founded_year": 1
} ).pretty()
```

# 2.b
```
db.companies.find({
    "founded_year":{
        "$gt":2000
    }
},{
    'name':1,
    "founded_year": 1
}).pretty();
```

# 2.c
```
db.companies.find({
    "founded_year":{
        "$gte": 1900,
        "$lte": 2010
    }
},{
    "name":1,
    "founded_year":1
}).pretty()
```

# 3.a

```
db.companies.find({
    "ipo.valuation_amount":{
        "$gt": 1000000
    }
},{
    "name":1,
    "ipo.valuation_amount":1,
    "ipo.valuation_currency_code":1
}).pretty()
```

# 3.b
```
db.companies.find({
    "ipo.valuation_amount":{
        "$gt": 1000000
    },
    "ipo.valuation_currency_code":"USD"
},{
    "name":1,
    "ipo.valuation_amount":1,
    "ipo.valuation_currency_code":1
}).pretty()

```

Use the inspections collection from the sample_training database for the questions below
1.Find all businesses which has violations issued
2.Find all business which has violations, and are in the city of New York.
3.Count how many businesses there in the city of New York
4.Count how many businesses there are in the city of Ridgewood and does not have violations (hint: google for "not equal" in Mongo)

# 1
```
db.inspections.find({
    "result": "Violation Issued"
},{
"business_name":1,
"result":1
}).pretty()

```

# 2
```
db.inspections.find({
    "result": "Violation Issued",
    "address.city":"New York"
},{
"business_name":1,
"address.city":1,
"result":1
}).pretty()

```

# 3
```
db.inspections.find({
    "address.city":"New York"
},{
}).count()
```

USE THE sample_resturants DATABASE FOR THE QUESTIONS BELOW

1.Find all restaurants that specialize in hamburgers cuisine
```
db.restaurants.find({
    "cuisine": "Hamburgers"
},{
    "name":1,
    "cuisine":1
})
```

2. Find all restaurants that specialize in American cuisine and are in the Bronx borough.
```
db.restaurants.find({
    "cuisine": "American",
    "borough": "Bronx"
},{
    "name":1,
    "cuisine":1,
    "borough":1
})
```
3. Find all restaurants that are located at the street "Stillwell Avenue"
```
db.restaurants.find({
    "address.street": "Stillwell Avenue",
},{
    "name":1,
    "address.street": 1
})
```

USE THE sample_mflix DATABASE FOR THE QUESTIONS BELOW
From the movies collection
1. Count how many movies there are
```
db.movies.find().count()
```
2. Count how many movies there are released before the year 2000
```
db.movies.find({
    "year": {"$lt": 2000}
}).count()

```
3. Show the first ten titles of movies produced in the USA
```
db.movies.find({
    "countries": "USA"
},{
    "title":1,
    "countries":1
}).limit(10)
```
4. Show the first ten titles of movies not produced in the USA
```
db.movies.find({
    "countries":{
        "$not": /USA/
    } 
},{
    "title":1,
    "countries":1
}).pretty()
```
5. Show movies that have at least 3 wins in the awards object
```
db.movies.find({
    "awards.wins":{
        "$gte": 3
    } 
},{
    "title":1,
    "awards.wins":1
}).pretty()
```
6. Show movies that have at least 3 nominations in the awards object
```
db.movies.find({
    "awards.nominations":{
        "$gte": 3
    } 
},{
    "title":1,
    "awards.nominations":1
}).pretty()
```
7. Show movies that cast Tom Cruise
```
db.movies.find({
    "cast": "Tom Cruise"
},{
    "title":1,
    "cast":1
}).pretty()
```
8. Show movies that are directed by Charles Chaplin
```
db.movies.find({
    "directors": "Charles Chaplin"
},{
    "title":1,
    "directors":1
}).pretty()
```

USE THE sample_weatherdata DATABASE FOR THE QUESTIONS BELOW

1. Count how many records there are of wind speed with rate higher than 5
```
db.data.find({
    "wind.speed.rate":{
        "$gt":5
    }
},{
    "ts":1,
    "wind.speed.rate":1
}).pretty().count()
```
2. Count how many records there are of wind speed with rate higher than 5 but is not 999.9
```
db.data.find({
    "wind.speed.rate":{
        "$gt":5,
        "$not":{
            "$eq":999.9
        } 
    }
},{
    "ts":1,
    "wind.speed.rate":1
}).pretty()
.count()
```