# Тестовое задание 1

## Постановка задачи

Создать 2 канваса 600x600 и 600x50, нарисовать в большем 5 закрашенных 5-и конечных звезд.
Красного, синего, зеленого, желтого и черного цветов и по клику мышкой на цветной звезде -
закрашивать маленький канвас - соответствующим цветом.
При клике на белую (не закрашенную) область большого канваса - маленький канвас - закрашивать белым.


## Решение 1 (Основное)

DEMO: https://mvkasatkin.github.io/test-task1/index.html

Решение выполнено в объектно-ориентированном стиле с использованием ES6, включая модули mjs.
Разработка велась в Chrome последней версии. Кросс-браузерность не проверялась в виду ограниченного времени.

Основная концепция:
1. Объект App - точка запуска приложения
2. Объект Canvas - отрисовывает себя, умеет принимать абстрактные объекты-фигуры ShapeAbstract, а также обрабатывать пользовательское событие нажатия мыши.
3. Объект ShapeAbstract - умеет отрисовывать себя в канвасе, а также определять клик по фигуре с использованием shadow canvas
4. Объект ShapeStar - фигура-звезда, наследуется от ShapeAbstract

Shadow Canvas - это внутренний канвас, свойство объекта ShapeAbstract, размером с данную фигуру.
Предназначен для определения нахождения точки (клика) внутри фигуры.

В архитектуре предусмотренно расширение количества фигур путем наследования от ShapeAbstract.
Также не представляется сложным добавить иную интерактивность, помимо клика - например Drag-n-Drop.
Однако, если бы я писал на привычном мне TypeScript, я бы несколько расширил абстракцию, добавив абстрактную фабрику для
совокупности классов, зависящих от разных способов работы с канвасом. Это позволило бы использовать специализированные библиотеки,
такие как PixiJS, Konva и им подобные, а также их замену одну на другую, не затрагивая бизнес-логику.

Из того, что не сделано, но в реальном проекте обязано быть:
- валидация типов (в идеале статичная типизация TypeScript или Flow)
- удаление/перемещение объектов, очистка канваса
- уничтожение объектов и отписка от событий


## Решение 2 (Упрощенное)

DEMO: https://mvkasatkin.github.io/test-task1/alternative.html

Данное альтернативное решение - это упрощенный и компактный вариант решения, в целом, удовлетворяющий требованию задачи,
но имеющий следующие недостатки:

- нерасширяем без изменения (нарушение Open-Closed Principle из SOLID)
- определяет цвет в точке клика без привязки к фигуре, что нарушает требование "по клику мышкой на цветной звезде",
так как канвас, теоретически, может содержать другие фигуры, помимо звезд, а также иметь заливку фона каким-либо изображением
- проблемы определения цвета на краях из-за антиалиасинга

Основной вариант решения лишен данных недостатков.