import http from '../services/http';

const mockup = process.env.NEXT_PUBLIC_MOCKUP === 'true';
const mockupDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

const get = async () => {
  if (mockup) {
    await mockupDelay();

    const stepsFisica = [
      {
        url: '/documento',
        title: 'Documento',
        actions: [
          {
            id: 'create',
            title: '',
          },
          {
            id: 'update-morfologia',
            title: '',
          },
          {
            id: 'update-renaper',
            title: '',
          },
          {
            id: 'update-lista-negra',
            title: '',
          },
          {
            id: 'update-lista-blanca',
            title: '',
          },
          {
            id: 'update-lista-negra-bind',
            title: '',
          },
          {
            id: 'update-nosis',
            title: '',
          },
          {
            id: 'update-dispositivo',
            title: '',
          },
        ],
      },
      {
        url: '/prueba-vida',
        title: 'Prueba de Vida',
        actions: [
          {
            id: 'update-prueba-vida',
            title: 'Comprobando prueba de vida',
          },
        ],
      },
      {
        url: '/email',
        title: 'Vamos a validar tu email',
        actions: [
          {
            id: 'update-email-scoring',
            title: '',
          },
        ],
      },
      {
        url: '/telefono',
        title: 'Vamos a validar tu celular',
        actions: [
          {
            id: 'update-telefono-scoring',
            title: '',
          },
        ],
      },
      {
        url: '/formulario',
        title: 'Algunos datos más',
        actions: [
          {
            id: 'update',
            title: '',
          },
          {
            id: 'update-padron-a5',
            title: '',
          },
          {
            id: 'update-sujeto-obligado',
            title: '',
          },
          {
            id: 'update-worldsys',
            title: '',
          },
          {
            id: 'update-matriz',
            title: '',
          },
          {
            id: 'update-legajo-digital',
            title: '',
          },
          {
            id: 'update-alta-cuenta',
            title: '',
          },
        ],
      },
      {
        url: '/credenciales',
        title: 'Home Banking',
        actions: [
          {
            id: 'update-credenciales',
            title: 'Actualizando credenciales',
          },
        ],
      },
      {
        url: '/cuenta-comitente',
        title: 'Cuenta Comitente',
        actions: [
          {
            id: 'update-cuenta-comitente',
            title: '',
          },
        ],
      },
      { url: '/finalizar', title: '¡Felicitaciones!' },
    ];

    const stepsJuridica = [
      {
        url: '/juridica',
        title: 'Completá el Formulario',
        actions: [
          {
            id: 'create-juridica',
            title: 'Creando solicitud',
          },
          {
            id: 'update-dispositivo-pj',
            title: '',
          },
        ],
      },
      { url: '/procesando', title: 'Procesando Solicitud' },
    ];

    const stepsCredenciales = [
      {
        url: '/telefono',
        title: 'Vamos a validar tu celular',
        actions: [],
      },
      {
        url: '/credenciales',
        title: 'Home Banking',
        actions: [
          {
            id: 'update-alta-cuenta',
            title: 'Creando cuenta',
          },
          {
            id: 'update-credenciales',
            title: 'Actualizando credenciales',
          },
        ],
      },
      { url: '/finalizar', title: '¡Felicitaciones!' },
    ];

    const stepsJubilo = [
      {
        url: '/documento',
        title: 'Documento',
        actions: [
          {
            id: 'create',
            title: '',
          },
          {
            id: 'update-renaper',
            title: '',
          },
          {
            id: 'update-morfologia',
            title: '',
          },
          {
            id: 'update-lista-negra',
            title: '',
          },
          {
            id: 'update-lista-blanca',
            title: '',
          },
          {
            id: 'update-lista-negra-bind',
            title: '',
          },
          {
            id: 'update-nosis',
            title: '',
          },
          {
            id: 'update-dispositivo',
            title: '',
          },
        ],
      },
      {
        url: '/cuil',
        title: 'Ingresá tu CUIL',
        actions: [
          {
            id: 'update-cuil',
            title: '',
          },
          {
            id: 'existe-persona',
            title: '',
          },
        ],
      },
      {
        url: '/email',
        title: 'Vamos a validar tu email',
        skipable: true,
        actions: [
          {
            id: 'update-email-scoring',
            title: '',
          },
        ],
      },
      {
        url: '/telefono',
        title: 'Vamos a validar tu celular',
        actions: [
          {
            id: 'update-telefono-scoring',
            title: '',
          },
        ],
      },
      {
        url: '/formulario-jubilo',
        title: 'Formulario',
        actions: [
          {
            id: 'update-jubilo',
            title: '',
          },
          {
            id: 'update-sujeto-obligado',
            title: '',
          },
          {
            id: 'update-worldsys',
            title: '',
          },
          {
            id: 'update-matriz',
            title: '',
          },
          {
            id: 'update-legajo-digital',
            title: '',
          },
          {
            id: 'update-alta-registro-email',
            title: '',
          },
          {
            id: 'update-alta-registro-celular',
            title: '',
          },
        ],
      },
      { url: '/finalizar', title: '¡Felicitaciones!' },
    ];

    return {
      jsonPersonaFisica: JSON.stringify(stepsFisica),
      jsonPersonaJuridica: JSON.stringify(stepsJuridica),
      jsonCredenciales: JSON.stringify(stepsCredenciales),
      jsonJubilo: JSON.stringify(stepsJubilo),
      color: '#FFAC1C',
      logo: 'data:image/png;base64,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',
    };
  }

  const id = sessionStorage.getItem('entidad');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/entidades/${id}`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const getTerminos = async () => {
  if (mockup) {
    return {
      nombre: 'Sample.pdf',
      contenido:
        'JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==',
    };
  }

  const id = sessionStorage.getItem('entidad');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/entidades/${id}/terminos`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const getTerminosBanco = async () => {
  if (mockup) {
    return {
      nombre: 'Sample.pdf',
      contenido:
        'JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==',
    };
  }

  const id = sessionStorage.getItem('entidad');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/entidades/${id}/terminos-banco`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const getTerminosCuentaComitente = async () => {
  if (mockup) {
    return {
      nombre: 'Sample.pdf',
      contenido:
        'JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==',
    };
  }

  const id = sessionStorage.getItem('entidad');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/entidades/${id}/terminos-cuenta-comitente`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

const getTerminosJubilo = async () => {
  if (mockup) {
    return {
      nombre: 'Sample.pdf',
      contenido:
        'JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg==',
    };
  }

  const id = sessionStorage.getItem('entidad');
  const url = `${process.env.NEXT_PUBLIC_API_URL}/entidades/${id}/terminos-jubilo`;

  const response = await http.get(url);
  if (!response.error) {
    return response.data;
  }

  window.location.replace(`error?code=${response.codigo}`);
  return false;
};

export const entidad = {
  get: get,
  getTerminos: getTerminos,
  getTerminosBanco: getTerminosBanco,
  getTerminosCuentaComitente: getTerminosCuentaComitente,
  getTerminosJubilo: getTerminosJubilo,
};
