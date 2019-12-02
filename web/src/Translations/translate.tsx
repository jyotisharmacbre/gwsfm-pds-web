class Translate {
  static getLabel(props: any, key: string, value?: object): string {
    let label: { [key: string]: any } = {};
    label[key] =
      props.intl &&
      props.intl.formatMessage(
        {
          id: key
        },
        value
      );
    return label[key];
  }
}

export default Translate;
