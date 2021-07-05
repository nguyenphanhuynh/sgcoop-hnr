const { getClient, query, queryParams } = require("../../db");

exports.index = function(request, response) {
    // response.render("admin/location/index", { title: "Khu Vực" });

    getClient((errClient, client) => {
        if (errClient) {
          response.send(503, errClient);
        }
    
        query("SELECT * FROM locations;", (err, res) => {
          client.end();
          if (err) {
            response.send(500, err);
          }
          else {
            // if (res.rows.length > 0) {
            // }
            // response.send(200, res);
            response.render("admin/location/index", { 
                title: "Khu Vực", 
                // locations: JSON.stringify(res.rows)
                locations: res.rows
              });
          }
        }, client);
      });
}