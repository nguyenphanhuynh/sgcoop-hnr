const { getClient, query, queryParams } = require("../../db");

exports.index = function(request, response) {
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
            response.render("admin/location/index", { 
                title: "Quản lý khu vực", 
                locations: res.rows
              });
          }
        }, client);
      });
}

exports.create = function (request, response) {
  response.render("admin/location/create", { title: "Bảng phân bổ" });
}

exports.createLocation = function(request, response) {
  if(request.body) {
    const { code, name } = request.body
    getClient((errClient, client) => {
      if (errClient) {
        response.send(503, errClient);
      }
  
      queryParams("INSERT INTO public.locations(code, name) VALUES ($1, $2);", [code, name], (err) => {
        client.end();
        if (err) {
          response.send(500, err);
        }
        else {
          response.redirect("/admin/locations?msg=Success");
        }
      }, client);
    });
  } else {
    response.redirect('/admin/locations/create');
  }
}

exports.deleteLocation = function (request, response) {
  if(request.params.location_id) {
    getClient((errClient, client) => {
      if (errClient) {
        response.send(503, errClient);
      }

      queryParams("DELETE FROM public.locations WHERE location_id=$1;", [request.params.location_id], (err, res) => {
        client.end();
        if (err) {
          response.redirect('/admin/locations?msg=non-success');
        } else {
          response.redirect('/admin/locations?msg=success');
        }
      }, client);
    });
  } else {
     response.redirect('/admin/locations');
  }
}