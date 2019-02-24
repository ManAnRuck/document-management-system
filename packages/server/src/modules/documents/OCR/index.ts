import Tesseract from 'tesseract.js';
// import franc from 'franc';

import docEvents, { NEW_FILE_SAVED } from '../../../lib/docEvents';
import File from '../../../entity/File';

docEvents.on(NEW_FILE_SAVED, async (file: File) => {
  const text = await new Promise(resolve => {
    Tesseract.recognize(
      `${__dirname}/../../../../uploads/${file.filenameServer}`,
      { tessedit_create_pdf: 1 },
    )
      .progress(p => {
        console.log('progress', p);
      })
      .then(result => {
        resolve(result.text);
        //   console.log('result file', file);
        //   file.content = result.text;
        //   file.save();
      });
  });
  console.log(text);
  //   const lang = franc(text as string);
  //   console.log('result lang', lang);
  //   Tesseract.recognize(
  //     `${__dirname}/../../../../uploads/${file.filenameServer}`,
  //     { lang, tessedit_create_pdf: 1, stream_filelist: 1 },
  //   )
  //     // .progress(p => {
  //     //   console.log('progress', p);
  //     // })
  //     .then(result => {
  //       console.log('result', Object.keys(result));
  //       file.content = result.text;
  //       file.save();
  //     });
});
