using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

[assembly: RosterIt.Infrastructure.LoggingInterceptor]

namespace RosterIt.Infrastructure
{

    // Any attribute which provides OnEntry/OnExit/OnException with proper args
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Constructor | AttributeTargets.Assembly | AttributeTargets.Module)]
    public class LoggingInterceptorAttribute : Attribute
    {
        // instance, method and args can be captured here and stored in attribute instance fields
        // for future usage in OnEntry/OnExit/OnException
        public void Init(object instance, MethodBase method, object[] args)
        {
        }
        public void OnEntry()
        {
        }

        public void OnExit()
        {
        }

        public void OnException(Exception exception)
        {
        }
    }

}