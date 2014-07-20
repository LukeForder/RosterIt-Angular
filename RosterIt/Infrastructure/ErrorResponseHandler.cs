using Nancy;
using Nancy.ErrorHandling;
using Nancy.Responses.Negotiation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RosterIt.Infrastructure
{
    public class ErrorResponseHandler : IStatusCodeHandler
    {
        private readonly IResponseNegotiator _negotiator;

        public ErrorResponseHandler(IResponseNegotiator negotiator)
        {
            _negotiator = negotiator;
        }

        public bool HandlesStatusCode(HttpStatusCode statusCode, NancyContext context)
        {
            return statusCode == HttpStatusCode.InternalServerError;
        }

        public void Handle(HttpStatusCode statusCode, NancyContext context)
        {
            Exception exception = ((Exception)context.Items[NancyEngine.ERROR_EXCEPTION]).InnerException;
            
            var errorException = exception as ErrorsException;

            object responseContent = (errorException != null) ?
                new { reasons = errorException.Reasons.ToArray() } :
                new { reasons = new string[] { "Unexpected error occured whilst processing your request." } };

            context.Response = _negotiator.NegotiateResponse(responseContent, context).WithStatusCode(statusCode);
        }
    }
}