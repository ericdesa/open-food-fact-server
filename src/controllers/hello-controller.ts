import { GET, Path, PathParam } from 'typescript-rest';
import { Database } from '../services/database';

/**
 * This is a demo operation to show how to use typescript-rest library.
 */
@Path('/hello')
export class HelloController {
    /**
     * Send a greeting message.
     * @param name The name that will receive our greeting message
     */
    @Path(':name')
    @GET
    async sayHello( @PathParam('name') name: string): Promise<string> {
        let result = await Database.query(`select * from products limit 1`);
        return result;
    }

}
