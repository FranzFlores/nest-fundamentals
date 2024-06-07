const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      // console.log({target})
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            //! Llamar la función propiamente con sus argumentos
            propertyDescriptor.value.apply(this, args); 
          }
          return wrapperFn;
        }
      }
    }   
}

export class Person {
    constructor(
        public readonly id: number,
        public name: string
    ) { }

    @Deprecated('Método obsoleto. Usar walk2')
    walk() {
        console.log(`${this.name.toUpperCase()} está caminando`);
    }

    walk2() {
        console.log(`${this.name.toUpperCase()} está caminando`);
    }

}

export const franz = new Person(1, 'Franz');
franz.walk();