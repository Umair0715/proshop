class AppError extends Error {
   constructor(message , statusCode){
      super(message);
      this.statusCode = statusCode || 500 ;
      this.status = `${this.statusCode}`.startsWith('4') ? 'error' : 'failed';
      this.stack = Error.captureStackTrace(this , this.constructor);
   }
}
module.exports = AppError;