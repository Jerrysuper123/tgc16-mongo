# create a new database
```
use animal_shelter
```

the database is not permanent until it has a collection

# create a collection, you simply add a doc to it (there is no command to create collection)

# add a doc to a collection
It works if the collection does not exist
Assume that we want to add obj into animals collection

```
db.animals.insertOne({
    'name':'Fluffy',
    'age':3,
    'breed':'Golden Retriever',
    'type':'Dog'
})
```

```
db.animals.insertMany([
    {
        'name':'Dazzy',
        'age':5,
        'breed':'Greyhound',
        'type':'Dog'
    },
    {
        'name':'Timmy',
        'age':1,
        'breed':'Border Collie',
        'type':'Dog'
    }
])
```

# update existing document
two methods
1. replace the whole document
2. replace some attributes


## Replace with new document
Assuming Timmy's ObjectID is `62172ec4ef25b8e0ee2b5030`
First arg is criteria, second is the set

```
db.animals.updateOne({
    '_id':ObjectId('62172ec4ef25b8e0ee2b5030')
},{
    $set:{
        'name':'Timmy',
        'breed':'German Shepherd',
        'age':1.5,
        'type':'Dog'
    }
})
```

## Update only one field in the document
We want to change the name of Timmy to Thunder:
```
db.animals.updateOne({
    '_id':ObjectId('62172ec4ef25b8e0ee2b5030')
},{
    $set:{
        'name':'Thunder'
    }
})
```

## delete an aniaml
```
db.animals.deleteOne({
    "_id": ObjectId("62172ec4ef25b8e0ee2b5030")
})
```

# hands on
HANDS ON
1. Create a new mongodb database with the name fake_school
```
```
2. Create a new collection name students
```
db.students
```
3. Add to the students collection the following documents:
```
db.students.insertOne(
    {
        "name" : "James Verses",
        "age" : 14,
        "subjects": ["Transfiguration", "Alchemy"],
        "date_enrolled": ISODate("2016-05-13")
    }
)
```

```
db.students.insertMany([
    {
        "name" : "Jonathan Goh",
        "age" : 12,
        "subjects": ["Divination", "Study of Ancient Runes"],
        "date_enrolled": ISODate("2017-04-16")
    },
    {
        "name" : "Jane Doe",
        "age" : 13,
        "subjects": ["Defense Against the Dark Arts", "Charms","History of Magic"],
        "date_enrolled": ISODate("2016-05-13")
    }
] )
```

Name: Jane Doe
Age: 13
Subjects: Defense Against the Dark Arts, Charms, History of Magic
Date Enrolled: 13th May 2016

Name: James Verses
Age: 14
Subjects: Transfiguration, Alchemy
Date Enrolled: 15th June 2015

Name: Jonathan Goh
Age: 12
Subjects: Divination, Study of Ancient Runes
Date Enrolled: 16th April 2017

1. Increase the age of all the students by 1
```
db.students.updateMany(
 {},
 {$inc:{"age":1}}
)
```
2. Change the date enrolled of Jonathan Goh to 2018 13th May
```
db.students.updateOne({
    "_id": ObjectId("62173282ef25b8e0ee2b5033")
},{
    $set:{
        "date_enrolled": ISODate("2018-05-13")
    }
})
```
3. Change the age of James Verses to 13
```
db.students.updateOne({
    "_id": ObjectId("621731c8ef25b8e0ee2b5032")
},{
    $set:{
        "age" : 13
    }
})
```
4. Change the student with the name of "Jane Doe" to "Jane Doe Jr" and her age to 11.

# $set means it is an object
```
db.students.updateOne({
    "_id": ObjectId("62173282ef25b8e0ee2b5034")
},{
    $set:{
        "name":"Jane Doe Jr",
        "age" : 11
    }
})
```

# How to work with embeded documents
keep track of the checkout each naiml had:

```
db.animals.insertOne({
    "name" : "Cookie",
    "age":3,
    "breed":"Lab Retriever",
    "type": "dog",
    "checkups": []
})
```

# ObjectId() will create unique values in checkups
# guaranteed to be unique in the same collection
```

db.animals.insertOne({
    'name':'Frenzy',
    'age':1,
    'breed':'Wild cat',
    'type':'Cat',
    'checkups':[
        {
            'id':ObjectId(),
            'name':'Dr Chua',
            'diagnosis':'Heartworms',
            'treatment':'Steriods'
        }
    ]
});
```


## Add a new sub-document to an array
got to array checkup.push({...})
```
db.animals.updateOne({
    '_id':ObjectId('62173dd4ef25b8e0ee2b5035')
},{
    '$push':{
        'checkups':{
            'id':ObjectId(),
            'name':'Dr Tan',
            'diagnosis':'Diabetes',
            'treatment':'Medication'
        }
    }
})
```


We can use $push on documents that don't have the array to begin with

```
db.animals.find({
    '_id':"62172c5d5e4cc3d0ca8b8407")
}.{
    $push:{
        'checkups':{
            'id':ObjectId(),
            'name':'Dr Chua',
            'diagnosis':'Stomache',
            'treatment':'Pills'
        }
    }
})


## Add a new sub-document to an array
```
db.animals.updateOne({
    '_id':ObjectId('62173de1c77fb2cf36a41a38')
},{
    '$push':{
        'checkups':{
            'id':ObjectId(),
            'name':'Dr Tan',
            'diagnosis':'Diabetes',
            'treatment':'Medication'
        }
    }
})
```

We can use $push on documents that don't have the array to begin with

```
db.animals.find({
    '_id':"62172c5d5e4cc3d0ca8b8407")
}.{
    $push:{
        'checkups':{
            'id':ObjectId(),
            'name':'Dr Chua',
            'diagnosis':'Stomache',
            'treatment':'Pills'
        }
    }
})