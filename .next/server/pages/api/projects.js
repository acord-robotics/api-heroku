(function() {
var exports = {};
exports.id = 646;
exports.ids = [646];
exports.modules = {

/***/ 181:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ projects; }
});

;// CONCATENATED MODULE: external "cotter-token-js"
var external_cotter_token_js_namespaceObject = require("cotter-token-js");;
;// CONCATENATED MODULE: ./pages/api/projects/index.js


const {
  Pool
} = __webpack_require__(723);

const connectionString = process.env.PG_CONNECTION_STRING;
const pool = new Pool({
  connectionString
});
/* harmony default export */ var projects = (async (req, res) => {
  // Check that the authorization header exists
  if (!("authorization" in req.headers)) {
    res.statusCode = 401;
    res.end("Authorization header missing");
  } // Extract the token string


  const auth = await req.headers.authorization;
  const bearer = auth.split(" ");
  const token = bearer[1];

  try {
    // Decode the Cotter JWT, "decoded.payload.identifier" is the user's email
    const decoded = new external_cotter_token_js_namespaceObject.CotterAccessToken(token); // Get design_projects by clients.email
    // Query credit: https://www.garysieling.com/blog/postgres-join-on-an-array-field/

    const query = `select design_projects.*
                       from design_projects
                                join clients on clients.id = ANY (design_projects.client)
                       where clients.email like $1;`;
    const {
      rows
    } = await pool.query(query, [decoded.payload.identifier]); // Respond with results

    res.statusCode = 200;
    res.json(rows);
  } catch (e) {
    // Handle any errors
    console.log(e);
    res.statusCode = 500;
    res.end("Server error. Something went wrong.");
  }
});

/***/ }),

/***/ 723:
/***/ (function(module) {

"use strict";
module.exports = require("pg");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(181));
module.exports = __webpack_exports__;

})();