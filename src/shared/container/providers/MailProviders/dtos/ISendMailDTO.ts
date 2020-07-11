import IParseMailTemplateDTO from "../../MailTemplateProvider/dtos/IParseMailTemplateDTO";

interface IMailData {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailData;
  from?: IMailData;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
