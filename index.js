import Progress from './Progress';

export function isFetchProgressSupported() {
  return (
    typeof Response !== 'undefined' && typeof ReadableStream !== 'undefined'
  );
}
export default function({
  defaultSize = 0,
  emitDelay = 10,
  onProgress = () => null,
  onComplete = () => null,
  onError = () => null,
}) {
  return function FetchProgress(response) {
    if (!isFetchProgressSupported()) {
      return response;
    }
    const { body, headers } = response;
    const contentLength = headers.get('content-length') || defaultSize;
    const progress = new Progress(contentLength, emitDelay);
    const reader = body.getReader();
    const stream = new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              onComplete({});
              controller.close();
              return;
            }
            if (value) {
              progress.flow(value, onProgress);
            }
            controller.enqueue(value);
            push();
          }).catch((err) => { onError(err); });
        }

        push();
      },
    });
    return new Response(stream, { headers });
  };
}
