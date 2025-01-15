import { Module } from '@nestjs/common';
import { Token } from './Token.class';

@Module({
    exports: [Token]
})
export class ModelsModule { }
