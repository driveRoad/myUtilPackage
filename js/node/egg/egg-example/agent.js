class AgentHookBook{
  configWillLoad() {
    console.log('egg agent will load');
  }
  configDidLoad() {
    console.log('egg agent Did load');
  }
  async didLoad() {
    console.log('egg agent did load');
  }
 async willReady() {
    console.log('egg agent will ready');
  }
async  didReady() {
    console.log('egg agent did ready');
  }
async  serverDidReady() {
    console.log('egg agent server did ready');
  }
}

module.exports = AgentHookBook;