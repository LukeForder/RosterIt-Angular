using Common.Logging;
using Nancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RosterIt.Modules
{
    public class DefaultModule : NancyModule
    {
        public DefaultModule()
        {
            ILog log = LogManager.GetCurrentClassLogger();

            Get["admin"] = (args) => View["Administrator.html"];

        }
    }
}