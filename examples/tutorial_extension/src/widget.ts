import { Widget } from '@lumino/widgets';
import { requestAPI } from './handler';

export class TutorialWidget extends Widget {
  constructor() {
    super();
    this.img = document.createElement('img');
    // hard code image source
    this.img.src = 'https://picsum.photos/600/400';
    this.node.appendChild(this.img);
    // retrieve image from API
    // this.load_image()
  }

  load_image(): void {
    // This is an example API call to the server extension associated with
    // this jupyterlab extension. It uses the generated handler.ts utility
    requestAPI<any>('image')
      .then(data => {
        console.log(data);
        this.img.src = data.image_url;
      })
      .catch(reason => {
        console.error(
          `The tutorial_extension server extension appears to be missing.\n${reason}`
        );
      });
  }

  make_a_file(path: string): void {
    const reply = requestAPI<any>('image', {body: JSON.stringify({'path': path}), method: 'POST'});
    console.log("Aaaand I'm back", reply);
  }

  // async make_a_file(path: string): Promise<void> {
  //   const reply = await requestAPI<any>('image', {body: JSON.stringify({'path': path}), method: 'POST'});
  //   console.log("Aaaand I'm back", reply);
  // }

  img: HTMLImageElement;
}
