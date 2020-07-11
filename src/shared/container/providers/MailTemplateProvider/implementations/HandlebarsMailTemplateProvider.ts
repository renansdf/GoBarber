import handlebars from 'handlebars';
import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import fs from 'fs';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parsedTemplate = handlebars.compile(templateFileContent);

    return parsedTemplate(variables);
  }
}

export default FakeMailTemplateProvider;
