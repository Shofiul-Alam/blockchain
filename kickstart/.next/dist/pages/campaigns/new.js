"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Layout = require("../../components/Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _semanticUiReact = require("semantic-ui-react");

var _factory = require("../../ethereum/factory");

var _factory2 = _interopRequireDefault(_factory);

var _web = require("../../ethereum/web3");

var _web2 = _interopRequireDefault(_web);

var _routes = require("../../routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "C:\\Users\\mrsho\\BlockChain\\kickstart\\pages\\campaigns\\new.js?entry";


var CampaignNew = function (_Component) {
  (0, _inherits3.default)(CampaignNew, _Component);

  function CampaignNew() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, CampaignNew);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = CampaignNew.__proto__ || (0, _getPrototypeOf2.default)(CampaignNew)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      minimumContribution: '',
      errorMessage: '',
      loading: false,
      timer: 1
    }, _this.myTimer = function () {
      var x = _this.state.timer + 1;
      _this.setState({ timer: x });
      console.log(_this.state.timer);
    }, _this.onSubmit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
        var accounts, x;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();

                _this.interval = setInterval(_this.myTimer.bind(_this), 1000);
                _this.setState({ loading: true, errorMessage: '' });
                _context.prev = 3;
                _context.next = 6;
                return _web2.default.eth.getAccounts();

              case 6:
                accounts = _context.sent;
                _context.next = 9;
                return _factory2.default.methods.createCampaign(_this.state.minimumContribution).send({
                  from: accounts[0]
                });

              case 9:
                x = _context.sent;

                _this.setState({ successMessage: 'Campaign has been successfully created' });
                setTimeout(function () {
                  _routes.Router.pushRoute('/');
                }, 1500);

                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](3);

                _this.setState({ error: true, errorMessage: _context.t0.message });

              case 17:

                clearInterval(_this.interval);
                _this.setState({ loading: false, value: '', timer: 1 });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[3, 14]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(CampaignNew, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(_Layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, _react2.default.createElement("h3", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, "Create a Campaign"), _react2.default.createElement(_semanticUiReact.Form, { onSubmit: this.onSubmit, error: !!this.state.errorMessage,
        success: !!this.state.successMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, _react2.default.createElement(_semanticUiReact.Form.Field, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, _react2.default.createElement("label", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, "Minium Contribution"), _react2.default.createElement(_semanticUiReact.Input, {
        value: this.state.minimumContribution,
        placeholder: "Minimum contribution",
        label: "Wei",
        labelPosition: "right",
        onChange: function onChange(event) {
          return _this3.setState({ minimumContribution: event.target.value });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      })), !this.state.loading ? null : _react2.default.createElement(_semanticUiReact.Progress, { percent: this.state.timer, active: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, " Active"), _react2.default.createElement(_semanticUiReact.Message, { success: true, header: "Success!", content: this.state.successMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: "Oops!", content: this.state.errorMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }), _react2.default.createElement(_semanticUiReact.Button, { type: "submit", primary: true, loading: this.state.loading, __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, "Create")));
    }
  }]);

  return CampaignNew;
}(_react.Component);

exports.default = CampaignNew;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzXFxjYW1wYWlnbnNcXG5ldy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIkxheW91dCIsIkJ1dHRvbiIsIkZvcm0iLCJJbnB1dCIsIk1lc3NhZ2UiLCJQcm9ncmVzcyIsImZhY3RvcnkiLCJ3ZWIzIiwiUm91dGVyIiwiQ2FtcGFpZ25OZXciLCJzdGF0ZSIsIm1pbmltdW1Db250cmlidXRpb24iLCJlcnJvck1lc3NhZ2UiLCJsb2FkaW5nIiwidGltZXIiLCJteVRpbWVyIiwieCIsInNldFN0YXRlIiwiY29uc29sZSIsImxvZyIsIm9uU3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJiaW5kIiwiZXRoIiwiZ2V0QWNjb3VudHMiLCJhY2NvdW50cyIsIm1ldGhvZHMiLCJjcmVhdGVDYW1wYWlnbiIsInNlbmQiLCJmcm9tIiwic3VjY2Vzc01lc3NhZ2UiLCJzZXRUaW1lb3V0IiwicHVzaFJvdXRlIiwiZXJyb3IiLCJtZXNzYWdlIiwiY2xlYXJJbnRlcnZhbCIsInZhbHVlIiwidGFyZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQU8sQUFBWTs7OztBQUNuQixBQUFTLEFBQVEsQUFBTSxBQUFPLEFBQVM7O0FBQ3ZDLEFBQU8sQUFBYTs7OztBQUNwQixBQUFPLEFBQVU7Ozs7QUFDakIsQUFBUSxBQUFhOzs7Ozs7O0lBRWYsQTs7Ozs7Ozs7Ozs7Ozs7O3NOQUNKLEE7MkJBQVEsQUFDZSxBQUNyQjtvQkFGTSxBQUVRLEFBQ2Q7ZUFITSxBQUdHLEFBQ1Q7YUFBTyxBLEFBSkQ7QUFBQSxBQUNOLGFBTUYsQSxVQUFTLFlBQU0sQUFDYjtVQUFNLElBQUssTUFBQSxBQUFLLE1BQUwsQUFBVyxRQUF0QixBQUE0QixBQUM1QjtZQUFBLEFBQUssU0FBUyxFQUFDLE9BQWYsQUFBYyxBQUFRLEFBQ3RCO2NB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