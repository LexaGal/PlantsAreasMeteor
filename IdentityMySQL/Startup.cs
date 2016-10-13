using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IdentityMySQL.Startup))]
namespace IdentityMySQL
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

