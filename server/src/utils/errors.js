function formatError(code, title, message) {
  return {
    error_code: code,
    error_title: title,
    error_message: message,
  };
}

function formatSuccess(code, title, message) {
  return {
    success_code: code,
    success_title: title,
    success_message: message,
  };
}

module.exports = {
  formatError,
  formatSuccess,
};
