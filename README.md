## Recuperação de Senha

**Requesitos Funcionais**
- O usuário deve poder recuperar sua senha informando seu email
- O usuário deve receber um email com as instruções para recuperação de senha
- O usuário deve então poder resetar sua senha

**Requesitos Não Funcionais**
- Utilizar Mail Trap no ambiente de desenvolvimento para realização de testes
- Utilizar Amazon SES para envio em produção
- O envio de emails deve ocorrer em segundo plano

**Regras de Negócio**
- O link para recuperação de senha deve expirar em 2 horas
- O usuário deve ter de inserir a nova senha duas vezes para estabelecer nova senha

## Atualização do Perfil

**Requesitos Funcionais**
- O usuário deve poder atualizar seu nome, email e senha

**Regras de Negócio**
- O Usuário não deve poder alterar seu email para um email que já está sendo usado
- Para atualizar sua senha, o usuário deve antes informar a senha atual
- Para atualizar sua senha, o usuário precisa confirmar a nova senha

## Agendamento de Serviços

**Requesitos Funcionais**
- O usuário deve poder listar todos os prestadores disoníveis
- O usuário deve poder listar os dias de um mês com pelo menos 1 horário disponível de um prestador específico
- O usuário deve poder listar os horários disponíveis de um dia específico de um prestador
- O usuário deve poder agendar o serviço

**Requesitos Não Funcionais**
- A listagem de prestadores deve ser armazenada em cache

**Regras de Negócio**
- Cada agendamento deve durar 1 hora
- Os agendamentos devem estar disponíveis entre 8h e 18h
- O usuário não deve poder agendar em um horário já ocupado
- O usuário não deve poder agendar em um horário passado
- O usuário não deve poder agendar serviços consigo mesmo

## Painel do Prestador

**Requesitos Funcionais**
- O prestador deve poder listar seus agendamentos de um dia específico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**Requesitos Não Funcionais**
- Os agendamentos do prestador, no dia vigente, devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io

**Regras de Negócio**
- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar
