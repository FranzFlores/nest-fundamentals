import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileNamer, fileFilter } from 'src/common/helpers';
import { Response } from 'express';

@Controller('/files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('/product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    limits: { fileSize: 200 },
    storage: diskStorage({
      destination: './static/uploads',
      filename: fileNamer
    })
  }))
  uploadFileProduct(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.saveProductImage(file);
  }

  @Get('/product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') image: string
  ) {
    const path = this.filesService.getStaticProductImage(image);
    res.status(200).sendFile(path);
  }
}
