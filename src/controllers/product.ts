import { GET, Path, PathParam } from 'typescript-rest';
import { Database } from '../services/database';

/**
 * This is a demo operation to show how to use typescript-rest library.
 */
@Path('/product')
export class ProductController {
    /**
     * Send a greeting message.
     * @param name The name that will receive our greeting message
     */
    @Path(':barcode')
    @GET
    async searchFromBarcode( @PathParam('barcode') barcode: string): Promise<string> {
        let query = `select * from products where code = ? limit 1`;
        let result = await Database.query(query, [barcode]);
        return result;
    }

}
