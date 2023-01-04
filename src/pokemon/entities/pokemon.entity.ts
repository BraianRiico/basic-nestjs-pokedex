import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {

    @Prop({
        unique: true,
        index: true, //Sirve para buscar
    })
    name: string;

    @Prop({
        unique: true,
        index: true, //Sirve para buscar
    })
    no  : number;

}

export const PokemonSchema = SchemaFactory.createForClass( Pokemon );