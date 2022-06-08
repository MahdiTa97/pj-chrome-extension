import React from 'react';
import { Text } from '../../ui';

interface Props {
  translatorData?: TScrapeResponse;
}

const headersNames = [
  '',
  'tr_title',
  'tr_publisher',
  'tr_abstracts',
  'tr_collectionTitle',
];

const HeaderAndFooter = () => (
  <tr>
    {headersNames.map((item) => (
      <th>
        <Text variant="p" key={item}>
          {item}
        </Text>
      </th>
    ))}
  </tr>
);

const TranslatorView = (props: Props) => {
  const { translatorData } = props;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <HeaderAndFooter />
          </thead>
          <tbody>
            {translatorData?.result?.map((item, index) => (
              <>
                <tr key={item.title}>
                  <th>{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.creators?.map((item) => item.literal + ', ')}</td>
                  <td>{item.abstracts}</td>
                  <td>{item.collectionTitle}</td>
                </tr>
              </>
            ))}
          </tbody>
          <tfoot>
            <HeaderAndFooter />
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default TranslatorView;
