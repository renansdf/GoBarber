import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailability';
import ProviderDayAvailability from '../controllers/ProviderDayAvailability';

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

const providersController = new ProvidersController;
const providerMonthAvailability = new ProviderMonthAvailability;
const providerDayAvailability = new ProviderDayAvailability;

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvailability.index);
providersRouter.get('/:provider_id/day-availability', providerDayAvailability.index);

export default providersRouter;