(function() {
var exports = {};
exports.id = 896;
exports.ids = [896];
exports.modules = {

/***/ 793:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _projectId_; }
});

;// CONCATENATED MODULE: external "cotter-node"
var external_cotter_node_namespaceObject = require("cotter-node");;
;// CONCATENATED MODULE: external "airtable"
var external_airtable_namespaceObject = require("airtable");;
var external_airtable_default = /*#__PURE__*/__webpack_require__.n(external_airtable_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/projects/[projectId].js


const base = new (external_airtable_default())({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: "https://proxy.syncinc.so/api.airtable.com"
}).base(process.env.AIRTABLE_BASE);
/* harmony default export */ var _projectId_ = (async (req, res) => {
  const {
    projectId
  } = req.query; // Check that the authorization header exists

  if (!("authorization" in req.headers)) {
    res.statusCode = 401;
    res.end("Authorization header missing");
  } // Extract the token string


  const auth = await req.headers.authorization;
  const bearer = auth.split(" ");
  const token = bearer[1];

  try {
    // Check that the JWT is valid
    const valid = await (0,external_cotter_node_namespaceObject.CotterValidateJWT)(token);

    if (!valid) {
      res.statusCode(403);
      res.end("Authentication token invalid");
    } // Update project complete status


    await base('Design projects').update([{
      "id": projectId,
      "fields": {
        "Complete": true
      }
    }]); // Respond with a 204

    res.statusCode = 204;
    res.end();
  } catch (e) {
    // Handle any errors
    console.log(e);
    res.statusCode = 500;
    res.end("Server error. Something went wrong.");
  }
});

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(793));
module.exports = __webpack_exports__;

})();