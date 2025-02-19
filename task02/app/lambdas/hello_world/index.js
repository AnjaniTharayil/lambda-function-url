exports.handler = async (event) => {
  // Default initialization if structure is unknown
  let httpMethod;
  let path;

  // Check for common structures:
  // This checks if `event` directly contains `httpMethod` and `path`
  if (event.httpMethod && event.path) {
    httpMethod = event.httpMethod;
    path = event.path;
  }
  // If using API Gateway (REST API), usually this format is followed
  else if (event.requestContext && event.requestContext.http) {
    httpMethod = event.requestContext.http.method;
    path = event.requestContext.http.path;
  }
  // If using API Gateway (HTTP API), another possible structure
  else if (
    event.requestContext &&
    event.requestContext.httpMethod &&
    event.path
  ) {
    httpMethod = event.requestContext.httpMethod;
    path = event.requestContext.path;
  }
  // More cases can be added based on the printed event structure

  // Handle both GET and POST requests to "/hello"
  if ((httpMethod === "GET" || httpMethod === "POST") && path === "/hello") {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello from Lambda" }),
    };
  } else {
    // Handle unsupported methods or paths
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Bad request syntax or unsupported method. Request path: ${
          path || "undefined"
        }. HTTP method: ${httpMethod || "undefined"}`,
      }),
    };
  }
};
