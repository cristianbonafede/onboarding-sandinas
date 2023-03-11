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
        title: 'Ingresá tu email',
        actions: [
          {
            id: 'update-email-scoring',
            title: '',
          },
        ],
      },
      {
        url: '/telefono',
        title: 'Ingresá tu teléfono',
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
        title: 'Ingresá tu teléfono',
        actions: [],
      },
      {
        url: '/credenciales',
        title: 'Credenciales',
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

    return {
      jsonPersonaFisica: JSON.stringify(stepsFisica),
      jsonPersonaJuridica: JSON.stringify(stepsJuridica),
      jsonCredenciales: JSON.stringify(stepsCredenciales),
      color: '#1CBFFF',
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

export const entidad = {
  get: get,
  getTerminos: getTerminos,
  getTerminosBanco: getTerminosBanco,
  getTerminosCuentaComitente: getTerminosCuentaComitente,
};
