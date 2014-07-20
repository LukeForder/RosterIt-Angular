using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RosterIt.Infrastructure
{
    public class CamelCaseJsonSerializer : JsonSerializer
    {
        public CamelCaseJsonSerializer()
        {
            this.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}