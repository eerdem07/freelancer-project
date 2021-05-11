export class Category{
  push(arg0: Category) {
    throw new Error('Method not implemented.')
  }
  key!:string
  name!: Web[] | Design[]
}

export class Web{
  key!:string
  name!:'Web Development'
  part!:{
      name:'Javascript' | 'HTML 5' | 'CSS' | 'Angular' | 'React' |  'TypeScript'
  }
}

export class Design{
  key!:string
  name!:'Design'
  part!:{
      name:'Web' | 'Graphic' | 'Photoshop' | 'Logo' | 'Word' |  '3D Modeling'
  }
}
