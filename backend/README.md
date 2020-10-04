
## Tips

En cas de problème pour une indexation unique, il faut reindexer la table :

```
db.users.createIndex({email:1}, {unique:true})
```