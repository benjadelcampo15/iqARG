// import {
//     Body,
//     Controller,
//     FileTypeValidator,
//     MaxFileSizeValidator,
//     Param,
//     ParseFilePipe,
//     ParseUUIDPipe,
//     Post,
//     UploadedFile,
//     UseInterceptors,
//   } from '@nestjs/common';
// import { CloudinaryService } from 'src/services/cloudinary.service';

//   @Controller('files')
//   export class CloudinaryController {
//     constructor(
//       private readonly cloudinaryService: CloudinaryService,
//       private readonly productService: productsService,
//     ) {}

//     @Post("uploadImage/:id")
//     @UseInterceptors(FileInterceptor("file"))
//     async uploadImage(
//       @Param('id' , ParseUUIDPipe) id: string,
//       @UploadedFile(
//         new ParseFilePipe({
//           validators: [
//             new MaxFileSizeValidator({
//               maxSize: 50000000000000000,
//               message: 'El tamaño máximo es de 200kb',
//             }),
//             new FileTypeValidator({ fileType: /(jpg|png|jpeg)$/i }),
//           ],
//         }),
//       )
//       file: Express.Multer.File,
//     ) {
//       await this.productService.getProductById(id);

//       const img = await this.cloudinaryService.uploadImage(file);

//       return this.productService.updateProduct(id, {
//         imgUrl: img.url,
//       });
//       ;
//     }
//   }
