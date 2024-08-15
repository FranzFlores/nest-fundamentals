import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
    constructor(
        private readonly configService: ConfigService
    ) { }

    saveProductImage(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Asegurate que el archivo es una imagen');
        }

        const rootPath = this.configService.get('HOST_API');
        const secureUrl = `${rootPath}/files/product/${file.filename}`;

        return { secureUrl };
    }

    getStaticProductImage(imageName: string) {
        const path = join(__dirname, '../../static/products', imageName);
        if (!existsSync(path)) {
            throw new BadRequestException('No se pudo encontrar la imagen');
        }

        return path;
    }
}
