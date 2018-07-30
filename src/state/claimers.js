import PropTypes from 'prop-types';
import { kea } from 'kea';

export default kea({
  actions: () => ({
    setClaimers: (claimers, loadingClaimers) =>
      ({ claimers, loadingClaimers }),
  }),

  reducers: ({ actions }) => ({
    data: [
      {
        claimers: [],
        loadingClaimers: true,
      },
      PropTypes.number, {
        [actions.setClaimers]: (state, payload) => ({
          ...state,
          claimers: payload.claimers,
          loadingClaimers: payload.loadingClaimers,
        }),
      }],
  }),
});
