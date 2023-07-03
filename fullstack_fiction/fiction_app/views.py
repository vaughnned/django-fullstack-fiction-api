from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseNotAllowed, JsonResponse
from rest_framework.viewsets import ModelViewSet
from .serializers import BookSerializer
from .models import Book

# Create your views here.


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


def delete_book(request, book_id):
    book_record = get_object_or_404(Book, id=book_id)

    if request.method == 'DELETE':
        book_record.delete()
        return render(request, 'react_app/index.html', {"book_id": book_id})
    else:
        return HttpResponseNotAllowed(['DELETE'])


def update_book(request, book_id):
    book_record = get_object_or_404(Book, id=book_id)

    if request.method == 'PUT':
        book_record.save()
        return render(request, 'react_app/index.html', {"book_id": book_id})
    else:
        return HttpResponseNotAllowed(['PUT'])


def create_book(request):
    print(request.data)
    if request.method == 'POST':
        data = Book.objects.create(
            title=request.data['title'], author=request.data['author'], description=request.data['description'])
        # return render(request, 'react_app/index.html')
        return JsonResponse(data, content_type='application/json')
    else:
        return HttpResponseNotAllowed(['POST'])
