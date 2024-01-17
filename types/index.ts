export interface NavigationProps {
  userIMG?: string;
  userName?: string;
}

export interface ProdukProps {
  _id: string;
  title: string;
  description?: string;
  price: number;
  images: any;
  __v: number;
}

export interface FormMethodProps {
  FormMethod: string;
  produkData?: ProdukProps;
}

export interface UploadImgProps {
  produkData?: ProdukProps;
  imageData?: any;
  setImageData?: (data: FormData) => any;
}
