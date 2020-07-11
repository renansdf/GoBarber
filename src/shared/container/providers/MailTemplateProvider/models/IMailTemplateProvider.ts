import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";

export default interface IMailTemplateProvider {
  parse({ file, variables }: IParseMailTemplateDTO): Promise<string>;
}
