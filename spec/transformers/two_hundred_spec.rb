require_relative '../spec_helper'

describe Textualize::TwoHundred do
  subject { described_class.new(response) }

  describe 'converts a 200 request with a body into a common hash' do
    let(:data) { '{ "yes": "no" }' }
    let(:response) do
      {
        '200' => {
          'body' => {
            'application/json' => {
              'example' => data
            }
          }
        }
      }
    end

    specify do
      expect(subject.transform).to eq(
        {
          response_code: 200,
          body: JSON.parse(data)
        }
      )
    end
  end
end
