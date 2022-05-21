export function messagesHandler() {
  let prevUrl = window.location.href;

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    switch (request.message) {
      case 'TabUpdated':
        if (document.location.href !== prevUrl) {
          prevUrl = document.location.href;
        }
        console.log('=====> prevUrl <=====', prevUrl);
        break;

      default:
        break;
    }
  });
}
