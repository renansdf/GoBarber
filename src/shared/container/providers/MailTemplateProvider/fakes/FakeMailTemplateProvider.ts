import IMailTemplateProvider from "../models/IMailTemplateProvider";

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Fake Email Template';
  }
}

export default FakeMailTemplateProvider;
