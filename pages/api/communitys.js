import { SiteClient } from 'datocms-client';
import * as dotenv from 'dotenv';

dotenv.config({path: __dirname+'/.env'});

export default async function Requests(req, res){
    const TOKEN = process.env.TOKEN;
    const client = new SiteClient(TOKEN);

    const registro = await client.items.create({
        itemType: '967733',
        ...req.body
    })

    res.json({
        registroCriado: registro
    })
}