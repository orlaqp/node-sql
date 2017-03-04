// REFERENCE
// https://docs.microsoft.com/en-us/azure/sql-database/sql-database-develop-nodejs-simple


var Connection = require('tedious').Connection;  
    var config = {  
        userName: 'username',  
        password: 'password',  
        server: 'server',  
        // When you connect to Azure SQL Database, you need these next options.  
        options: {encrypt: true, database: 'db'}  
    };  
    var connection = new Connection(config);  
    connection.on('connect', function(err) {  
        if (err) return console.error(err);
        // If no error, then good to proceed.  
        console.log("Connected");  
        executeStatement();  
    });  

    var Request = require('tedious').Request;  
    var TYPES = require('tedious').TYPES;  

    function executeStatement() {  
        request = new Request("<statement>", function(err) {  
        if (err) {  
            console.log(err);}  
        });  
        var result = "";  
        request.on('row', function(columns) {  
            columns.forEach(function(column) {  
              if (column.value === null) {  
                console.log('NULL');  
              } else {  
                result+= column.value + " ";  
              }  
            });  
            console.log(result);  
            result ="";  
        });  

        request.on('done', function(rowCount, more) {  
        console.log(rowCount + ' rows returned');  
        });  
        connection.execSql(request);  
    }

